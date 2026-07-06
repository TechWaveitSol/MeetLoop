import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../theme.dart';

class GamesLobbyScreen extends StatefulWidget {
  const GamesLobbyScreen({Key? key}) : super(key: key);

  @override
  State<GamesLobbyScreen> createState() => _GamesLobbyScreenState();
}

class _GamesLobbyScreenState extends State<GamesLobbyScreen> {
  List<String?> _board = List.generate(9, (_) => null);
  bool _isPlayerTurn = true;
  String? _winnerMessage;

  void _resetGame() {
    setState(() {
      _board = List.generate(9, (_) => null);
      _isPlayerTurn = true;
      _winnerMessage = null;
    });
  }

  String? _checkWinner(List<String?> s) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (var line in lines) {
      if (s[line[0]] != null && s[line[0]] == s[line[1]] && s[line[0]] == s[line[2]]) {
        return s[line[0]];
      }
    }
    if (s.every((element) => element != null)) {
      return 'Draw';
    }
    return null;
  }

  void _makeMove(int index) {
    if (_board[index] != null || _winnerMessage != null || !_isPlayerTurn) return;

    setState(() {
      _board[index] = '❌';
      final win = _checkWinner(_board);
      if (win != null) {
        _winnerMessage = win == 'Draw' ? "It's a draw! 🤝" : "Winner is: ❌";
        return;
      }
      _isPlayerTurn = false;
    });

    // Simulate opponent response
    Future.delayed(const Duration(milliseconds: 600), () {
      if (!mounted) return;
      final emptyIndices = <int>[];
      for (var i = 0; i < 9; i++) {
        if (_board[i] == null) emptyIndices.add(i);
      }
      if (emptyIndices.isNotEmpty) {
        final rIndex = (emptyIndices..shuffle()).first;
        setState(() {
          _board[rIndex] = '⭕️';
          final win = _checkWinner(_board);
          if (win != null) {
            _winnerMessage = win == 'Draw' ? "It's a draw! 🤝" : "Winner is: ⭕️";
          } else {
            _isPlayerTurn = true;
          }
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final bool isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(title: const Text('Games Arenas')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(18.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Games Banner Stats
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: Colors.slate[900],
                borderRadius: BorderRadius.circular(24),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        '🏆 Global Ranking Score',
                        style: TextStyle(color: Colors.amber, fontWeight: FontWeight.bold, fontSize: 10),
                      ),
                      const SizedBox(height: 6),
                      const Text(
                        'Chess Master Tier',
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 15),
                      ),
                      Text('1,480 Arena Score', style: TextStyle(color: Colors.grey[500], fontSize: 11)),
                    ],
                  ),
                  const Text('82%', style: TextStyle(color: AppTheme.mint, fontSize: 24, fontWeight: FontWeight.w900)),
                ],
              ),
            ).animate().fadeIn(),

            const SizedBox(height: 24),

            // Live Playable Game
            Container(
              padding: const EdgeInsets.all(16),
              decoration: AppTheme.glassDecoration(isDarkMode: isDarkMode),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Casual Arena: Tic Tac Toe', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                      TextButton(onPressed: _resetGame, child: const Text('Reset', style: TextStyle(fontSize: 11))),
                    ],
                  ),
                  const SizedBox(height: 12),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 3,
                      crossAxisSpacing: 8,
                      mainAxisSpacing: 8,
                    ),
                    itemCount: 9,
                    itemBuilder: (context, index) {
                      return GestureDetector(
                        onTap: () => _makeMove(index),
                        child: Container(
                          decoration: BoxDecoration(
                            color: isDarkMode ? Colors.slate[800] : Colors.slate[100],
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Center(
                            child: Text(
                              _board[index] ?? '',
                              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 12),
                  Text(
                    _winnerMessage ?? (_isPlayerTurn ? "Your turn (❌)" : "Opponent planning... (⭕️)"),
                    style: const TextStyle(fontSize: 11, fontFamily: 'monospace'),
                  ),
                ],
              ),
            ).animate().fadeIn(delay: 200.ms),
          ],
        ),
      ),
    );
  }
}

class TravelPlannerScreen extends StatefulWidget {
  const TravelPlannerScreen({Key? key}) : super(key: key);

  @override
  State<TravelPlannerScreen> createState() => _TravelPlannerScreenState();
}

class _TravelPlannerScreenState extends State<TravelPlannerScreen> {
  final List<Map<String, dynamic>> _itinerary = [
    {'day': 1, 'title': 'Meet up & Cafe brief ☕️'},
    {'day': 2, 'title': 'Trekking sunset peak 🌅'},
    {'day': 3, 'title': 'Cozy bonfire stories 🔥'},
  ];

  final TextEditingController _itineraryController = TextEditingController();

  void _addItem() {
    if (_itineraryController.text.trim().isEmpty) return;
    setState(() {
      _itinerary.add({
        'day': _itinerary.length + 1,
        'title': _itineraryController.text,
      });
      _itineraryController.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    final bool isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(title: const Text('Travel Companions')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: Stack(
                children: [
                  Image.network(
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
                    height: 160,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                  Container(height: 160, color: Colors.black26),
                  const Positioned(
                    bottom: 16,
                    left: 16,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('July 15 - 20, 2026', style: TextStyle(color: Colors.white70, fontSize: 10, fontFamily: 'monospace')),
                        Text('Gokarna Roadtrip', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w900)),
                      ],
                    ),
                  )
                ],
              ),
            ).animate().fadeIn(),

            const SizedBox(height: 24),

            // Itinerary
            Text(
              'SHARED TRIP ITINERARY',
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.extrabold,
                letterSpacing: 1.5,
                color: Colors.grey[500],
              ),
            ),
            const SizedBox(height: 12),

            Container(
              padding: const EdgeInsets.all(16),
              decoration: AppTheme.glassDecoration(isDarkMode: isDarkMode),
              child: Column(
                children: [
                  ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: _itinerary.length,
                    itemBuilder: (context, idx) {
                      final item = _itinerary[idx];
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 8.0),
                        child: Row(
                          children: [
                            CircleAvatar(
                              radius: 12,
                              backgroundColor: AppTheme.primary.withOpacity(0.15),
                              child: Text(
                                '${item['day']}',
                                style: const TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Text(item['title'], style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500)),
                          ],
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _itineraryController,
                          style: const TextStyle(fontSize: 12),
                          decoration: InputDecoration(
                            hintText: 'Add new daily stop...',
                            filled: true,
                            fillColor: isDarkMode ? Colors.slate[800] : Colors.slate[100],
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                            contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      IconButton(
                        icon: const Icon(Icons.add_circle, color: AppTheme.primary),
                        onPressed: _addItem,
                      )
                    ],
                  ),
                ],
              ),
            ).animate().fadeIn(delay: 200.ms),
          ],
        ),
      ),
    );
  }
}
