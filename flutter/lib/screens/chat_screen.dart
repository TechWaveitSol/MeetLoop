import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import '../theme.dart';

// ==================== 1. CHATS OVERVIEW ====================
class ChatListScreen extends StatelessWidget {
  const ChatListScreen({super.key});

  final List<Map<String, dynamic>> _mockChats = const [
    {
      'id': 'c1',
      'name': 'Ananya Sen',
      'avatar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      'lastMessage': 'Awesome! Let\'s play a round of Chess then ♟️',
      'time': 'Just now',
      'unread': 2,
    },
    {
      'id': 'c2',
      'name': 'Pooja Reddy',
      'avatar': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      'lastMessage': 'I added a hiking trek for Saturday on our roadmap.',
      'time': '20m ago',
      'unread': 1,
    },
    {
      'id': 'c3',
      'name': 'Kunal Verma',
      'avatar': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      'lastMessage': 'Hey Arjun! Wanna jam on the acoustics tonight?',
      'time': '2h ago',
      'unread': 0,
    }
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Messages', style: TextStyle(fontWeight: FontWeight.black, fontSize: 16)),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: ListView.builder(
            itemCount: _mockChats.length,
            physics: const BouncingScrollPhysics(),
            itemBuilder: (context, idx) {
              final chat = _mockChats[idx];
              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(14),
                decoration: AppTheme.glassDecoration(context: context),
                child: ListTile(
                  contentPadding: EdgeInsets.zero,
                  onTap: () => context.push('/chats/${chat['id']}'),
                  leading: Stack(
                    children: [
                      CircleAvatar(
                        radius: 24,
                        backgroundImage: NetworkImage(chat['avatar']!),
                      ),
                      Positioned(
                        right: 0,
                        bottom: 0,
                        child: Container(
                          width: 12,
                          height: 12,
                          decoration: BoxDecoration(
                            color: AppTheme.mint,
                            shape: BoxShape.circle,
                            border: Border.all(color: Colors.white, width: 2),
                          ),
                        ),
                      ),
                    ],
                  ),
                  title: Text(chat['name']!, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                  subtitle: Text(
                    chat['lastMessage']!,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(color: Colors.grey, fontSize: 10),
                  ),
                  trailing: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(chat['time']!, style: const TextStyle(color: Colors.grey, fontSize: 8)),
                      const SizedBox(height: 4),
                      if (chat['unread'] > 0)
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                          decoration: const BoxDecoration(color: AppTheme.primary, shape: BoxShape.circle),
                          child: Text(
                            '${chat["unread"]}',
                            style: const TextStyle(color: Colors.white, fontSize: 7, fontWeight: FontWeight.bold),
                          ),
                        ),
                    ],
                  ),
                ),
              ).animate().fadeIn(delay: (idx * 50).ms);
            },
          ),
        ),
      ),
    );
  }
}

// ==================== 2. INDIVIDUAL CONVERSATION ====================
class IndividualChatScreen extends StatefulWidget {
  final String chatId;
  const IndividualChatScreen({super.key, required this.chatId});

  @override
  State<IndividualChatScreen> createState() => _IndividualChatScreenState();
}

class _IndividualChatScreenState extends State<IndividualChatScreen> {
  final _msgController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  final List<Map<String, dynamic>> _messages = [
    {'text': 'Hey Arjun! Really liked your portfolio design.', 'sentByMe': false},
    {'text': 'Thanks Ananya! Appreciate the feedback.', 'sentByMe': true},
    {'text': 'Wanna meet at Sector 5 Coffee for a game of Chess?', 'sentByMe': false},
  ];

  final List<String> _suggestions = [
    'Sure, 5:00 PM works! ☕',
    'How about Chess?',
    'Awesome concept!',
  ];

  void _sendMessage(String text) {
    if (text.trim().isEmpty) return;
    setState(() {
      _messages.add({'text': text, 'sentByMe': true});
      _msgController.clear();
    });

    // AutoScroll to bottom
    Future.delayed(const Duration(milliseconds: 100), () {
      _scrollController.animateTo(
        _scrollController.position.maxScrollExtent,
        duration: const Duration(milliseconds: 250),
        curve: Curves.easeOut,
      );
    });

    // Simulated reply
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted) {
        setState(() {
          _messages.add({
            'text': 'Perfect! Let\'s challenge each other. High Streak unlocked! 🏆',
            'sentByMe': false
          });
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 0,
        leading: IconButton(
          onPressed: () => context.go('/chats'),
          icon: const Icon(Icons.arrow_back),
        ),
        title: const Row(
          children: [
            CircleAvatar(
              radius: 16,
              backgroundImage: NetworkImage('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'),
            ),
            SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Ananya Sen', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                Text('ACTIVE NOW', style: TextStyle(fontSize: 8, color: AppTheme.mint, fontWeight: FontWeight.bold)),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Simulating Audio connection... 📞')),
              );
            },
            icon: const Icon(Icons.phone_outlined, size: 20),
          ),
          IconButton(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Starting Agora Video stream... 🎥')),
              );
            },
            icon: const Icon(Icons.videocam_outlined, size: 20),
          ),
        ],
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Chat bubble list
            Expanded(
              child: ListView.builder(
                controller: _scrollController,
                itemCount: _messages.length,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                physics: const BouncingScrollPhysics(),
                itemBuilder: (context, idx) {
                  final msg = _messages[idx];
                  final isMe = msg['sentByMe'];
                  return Align(
                    alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
                    child: Container(
                      margin: const EdgeInsets.only(bottom: 8),
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 11),
                      decoration: BoxDecoration(
                        color: isMe ? AppTheme.primary : Theme.of(context).cardColor,
                        borderRadius: BorderRadius.only(
                          topLeft: const Radius.circular(20),
                          topRight: const Radius.circular(20),
                          bottomLeft: Radius.circular(isMe ? 20 : 0),
                          bottomRight: Radius.circular(isMe ? 0 : 20),
                        ),
                        boxShadow: AppTheme.premiumShadow,
                      ),
                      child: Text(
                        msg['text'],
                        style: TextStyle(
                          color: isMe ? Colors.white : Theme.of(context).textTheme.bodyMedium?.color,
                          fontSize: 11.5,
                        ),
                      ),
                    ).animate().scale(duration: 200.ms, alignment: isMe ? Alignment.bottomRight : Alignment.bottomLeft),
                  );
                },
              ),
            ),

            // Smart reply suggestion pills
            SizedBox(
              height: 38,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.only(left: 16),
                itemCount: _suggestions.length,
                itemBuilder: (context, idx) {
                  final sugg = _suggestions[idx];
                  return Padding(
                    padding: const EdgeInsets.only(right: 8.0),
                    child: ActionChip(
                      onPressed: () => _sendMessage(sugg),
                      label: Text(sugg, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.primary)),
                      backgroundColor: AppTheme.primary.withOpacity(0.06),
                      side: BorderSide(color: AppTheme.primary.withOpacity(0.12)),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 8),

            // Chat Input Row
            Padding(
              padding: const EdgeInsets.all(12.0),
              child: Row(
                children: [
                  Expanded(
                    child: Container(
                      decoration: AppTheme.glassDecoration(context: context, borderOpacity: 0.1),
                      child: TextField(
                        controller: _msgController,
                        style: const TextStyle(fontSize: 12),
                        decoration: const InputDecoration(
                          hintText: 'Type an intimate reply...',
                          hintStyle: TextStyle(fontSize: 12, color: Colors.grey),
                          border: InputBorder.none,
                          contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        ),
                        onSubmitted: (val) => _sendMessage(val),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  GestureDetector(
                    onTap: () => _sendMessage(_msgController.text),
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: const BoxDecoration(color: AppTheme.primary, shape: BoxShape.circle),
                      child: const Icon(Icons.send_rounded, color: Colors.white, size: 16),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
