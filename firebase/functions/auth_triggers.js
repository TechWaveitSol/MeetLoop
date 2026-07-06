const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Admin SDK if not already initialized
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();

/**
 * Triggered on Firebase User Creation.
 * Provisions default Firestore collections, sets default user configurations.
 */
exports.triggerUserCreation = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL, phoneNumber } = user;
  
  const userDocRef = db.collection('users').doc(uid);

  const defaultProfile = {
    uid: uid,
    email: email || '',
    phoneNumber: phoneNumber || '',
    displayName: displayName || 'New Explorer',
    photoURL: photoURL || '',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    isEmailVerified: user.emailVerified || false,
    profileCompletion: 20, // Initial percentage for signing up
    gender: '',
    pronouns: '',
    bio: '',
    relationshipStatus: 'Single',
    occupation: '',
    education: '',
    hobbies: [],
    interests: [],
    photos: photoURL ? [photoURL] : [],
    privacySettings: {
      ghostMode: false,
      hideLocation: false,
      showOnlineStatus: true,
      allowDirectMessages: true,
    },
    notificationSettings: {
      pushEnabled: true,
      emailNotifications: true,
      matchesOnly: false,
    },
    verificationBadge: false,
  };

  try {
    await db.runTransaction(async (transaction) => {
      // 1. Provision user document
      transaction.set(userDocRef, defaultProfile);

      // 2. Add an audit log session for account creation
      const sessionRef = userDocRef.collection('sessions').doc();
      transaction.set(sessionRef, {
        sessionId: sessionRef.id,
        device: 'Web/Auth Trigger',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        lastActive: admin.firestore.FieldValue.serverTimestamp(),
        status: 'active',
      });
    });

    console.log(`Successfully provisioned MeetLoop profile for User: ${uid}`);
  } catch (error) {
    console.error(`Failed to provision profile for user ${uid}:`, error);
  }
});

/**
 * Triggered on Firebase User Deletion.
 * Cleans up personal profile, user uploads, session metadata.
 */
exports.triggerUserDeletion = functions.auth.user().onDelete(async (user) => {
  const { uid } = user;
  
  const userDocRef = db.collection('users').doc(uid);

  try {
    // 1. Retrieve subcollection documents
    const sessionsSnapshot = await userDocRef.collection('sessions').get();
    
    const batch = db.batch();

    // Delete all user sessions
    sessionsSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Delete main user profile
    batch.delete(userDocRef);

    // Commit deletion batch
    await batch.commit();

    console.log(`Successfully completed cleanup for Deleted User: ${uid}`);
  } catch (error) {
    console.error(`Failed cleanup operations for deleted user ${uid}:`, error);
  }
});
