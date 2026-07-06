const { triggerUserCreation, triggerUserDeletion } = require('./auth_triggers');

// Export functions for deployment
exports.onUserCreated = triggerUserCreation;
exports.onUserDeleted = triggerUserDeletion;
