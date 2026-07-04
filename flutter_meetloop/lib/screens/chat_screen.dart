import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../theme.dart';

class ChatListScreen extends StatelessWidget {
  const ChatListScreen({Key? key}) : super(key: key);

  final List<Map<String, dynamic>> _mockChats = const [
    {
      'id': 'c1',
      'name': 'Ananya',
      'avatar': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
      'lastMsg': 'Hey Arjun! Wanna play Chess tonight?',
      'time': 'Just now',
      'unread': true,
    },
    {
      'id': 'c2',
      'name': 'Rohan',
      'avatar': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
      'lastMsg': 'Tic Tac Toe rematch whenever you are free!',
      'time': '12m ago',
      'unread': false,
    },
    {
      'id': 'c3',
      'name': 'Pooja',
      'avatar': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100',
      'lastMsg': 'Our sunset hiking route is finalized! 🧭⛰️',
      'time': '1h ago',
      'unread': true,
    }
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Inbox Orbit'),
        centerTitle: false,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
        itemCount: _mockChats.length,
        itemBuilder: (context, index) {
          final chat = _mockChats[index];
          return GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => InteractiveChatScreen(chatId: chat['id']),
                ),
              );
            },
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: Container(
                padding: const EdgeInsets.all(12),
                decoration: AppTheme.glassDecoration(
                  isDarkMode: Theme.of(context).brightness == Brightness.dark,
                ),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 24,
                      backgroundImage: NetworkImage(chat['avatar']),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                chat['name'],
                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                              ),
                              Text(
                                chat['time'],
                                style: TextStyle(color: Colors.grey[400], fontSize: 9),
                              ),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Text(
                            chat['lastMsg'],
                            style: TextStyle(
                              fontSize: 11,
                              color: chat['unread'] ? AppTheme.primary : Colors.grey[500],
                              fontWeight: chat['unread'] ? FontWeight.bold : FontWeight.normal,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                    if (chat['unread'])
                      Container(
                        margin: const EdgeInsets.only(left: 8),
                        width: 8,
                        height: 8,
                        decoration: const BoxDecoration(
                          color: AppTheme.primary,
                          shape: BoxShape.circle,
                        ),
                      )
                  ],
                ),
              ),
            ).animate().fadeIn(delay: (index * 100).ms),
          );
        },
      ),
    );
  }
}

class InteractiveChatScreen extends StatefulWidget {
  final String chatId;
  const InteractiveChatScreen({Key? key, required this.chatId}) : super(key: key);

  @override
  State<InteractiveChatScreen> createState() => _InteractiveChatScreenState();
}

class _InteractiveChatScreenState extends State<InteractiveChatScreen> {
  final List<Map<String, dynamic>> _messages = [
    {'text': 'Hey Arjun! Let\'s synchronize our locations today', 'isMe': false},
    {'text': 'Sounds like a master plan! Sunset hiking or chess arena first?', 'isMe': true},
    {'text': 'Let\'s definitely do the chess challenge first. Prepare to lose! ♟️👑', 'isMe': false},
  ];

  final TextEditingController _msgController = TextEditingController();

  void _sendMessage() {
    if (_msgController.text.trim().isEmpty) return;
    setState(() {
      _messages.add({
        'text': _msgController.text,
        'isMe': true,
      });
      _msgController.clear();
    });

    // Simulate response delay
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted) {
        setState(() {
          _messages.add({
            'text': 'Haha challenge accepted! Let\'s lock in the schedule now. 🧭',
            'isMe': false,
          });
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            const CircleAvatar(
              radius: 16,
              backgroundImage: NetworkImage('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Ananya', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                Text('Active 3m ago', style: TextStyle(fontSize: 9, color: Colors.grey[400])),
              ],
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              reverse: false,
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                return Align(
                  alignment: msg['isMe'] ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.symmetric(vertical: 6),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    decoration: BoxDecoration(
                      color: msg['isMe'] 
                          ? AppTheme.primary 
                          : Theme.of(context).brightness == Brightness.dark 
                              ? Colors.slate[800] 
                              : Colors.slate[200],
                      borderRadius: BorderRadius.only(
                        topLeft: const Radius.circular(20),
                        topRight: const Radius.circular(20),
                        bottomLeft: msg['isMe'] ? const Radius.circular(20) : const Radius.circular(4),
                        bottomRight: msg['isMe'] ? const Radius.circular(4) : const Radius.circular(20),
                      ),
                    ),
                    child: Text(
                      msg['text'],
                      style: TextStyle(
                        fontSize: 13,
                        color: msg['isMe'] ? Colors.white : null,
                      ),
                    ),
                  ).animate().scale(alignment: msg['isMe'] ? Alignment.centerRight : Alignment.centerLeft, duration: 150.ms),
                );
              },
            ),
          ),

          // Smart Quick replies bar
          Container(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  _buildSmartReply('I\'m on my way! 🚗'),
                  _buildSmartReply('Let\'s play! ♟️'),
                  _buildSmartReply('Send coordinates 📍'),
                ],
              ),
            ),
          ),

          // Message bar input
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.only(left: 16, right: 16, bottom: 12, top: 4),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _msgController,
                      style: const TextStyle(fontSize: 13),
                      decoration: InputDecoration(
                        hintText: 'Type messages...',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(24),
                          borderSide: BorderSide.none,
                        ),
                        filled: true,
                        fillColor: Theme.of(context).brightness == Brightness.dark 
                            ? Colors.slate[800] 
                            : Colors.slate[100],
                        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  GestureDetector(
                    onTap: _sendMessage,
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: const BoxDecoration(
                        color: AppTheme.primary,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.send, size: 18, color: Colors.white),
                    ),
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSmartReply(String text) {
    return GestureDetector(
      onTap: () {
        setState(() {
          _messages.add({'text': text, 'isMe': true});
        });
      },
      child: Container(
        margin: const EdgeInsets.only(right: 8),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey.withOpacity(0.3)),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Text(
          text,
          style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}
