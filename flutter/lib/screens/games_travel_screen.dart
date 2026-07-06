import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../theme.dart';

class GamesTravelScreen extends StatefulWidget {
  final String tab; // 'games' | 'travel'
  const GamesTravelScreen({super.key, required this.tab});

  @override
  State<GamesTravelScreen> createState() => _GamesTravelScreenState();
}

class _GamesTravelScreenState extends State<GamesTravelScreen> {
  // Mini Game Board state: Tic Tac Toe
  List<String> _board = List.filled(9, '');
  bool _isPlayerTurn = true;
  String _gameStatus = 'Your Turn (❌)';

  void _resetBoard() {
    setState(() {
      _board = List.filled(9, '');
      _isPlayerTurn = true;
      _gameStatus = 'Your Turn (❌)';
    });
  }

  void _makeMove(int index) {
    if (_board[index].isNotEmpty || !_isPlayerTurn || _checkWinner() != null) return;

    setState(() {
      _board[index] = '❌';
      _isPlayerTurn = false;
      _gameStatus = 'Rohan is planning... ⭕️';
    });

    final winner = _checkWinner();
    if (winner != null) {
      _handleGameEnd(winner);
      return;
    }

    // Simulate Opponent Rohan playing after delay
    Future.delayed(const Duration(milliseconds: 700), () {
      if (!mounted) return;
      _makeOpponentMove();
    });
  }

  void _makeOpponentMove() {
    final emptyIndices = <int>[];
    for (int i = 0; i < _board.length; i++) {
      if (_board[i].isEmpty) emptyIndices.add(i);
    }

    if (emptyIndices.isNotEmpty) {
      final randomIndex = emptyIndices[Random().nextInt(emptyIndices.length)];
      setState(() {
        _board[randomIndex] = '⭕️';
        _isPlayerTurn = true;
        _gameStatus = 'Your Turn (❌)';
      });

      final winner = _checkWinner();
      if (winner != null) {
        _handleGameEnd(winner);
      }
    }
  }

  String? _checkWinner() {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (var line in lines) {
      if (_board[line[0]].isNotEmpty &&
          _board[line[0]] == _board[line[1]] &&
          _board[line[0]] == _board[line[2]]) {
        return _board[line[0]];
      }
    }

    if (_board.every((cell) => cell.isNotEmpty)) return 'Draw';
    return null;
  }

  void _handleGameEnd(String result) {
    setState(() {
      if (result == 'Draw') {
        _gameStatus = 'Match is a Draw! 🤝';
      } else if (result == '❌') {
        _gameStatus = 'Victory! 🏆 Streak Doubled!';
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Victory! Streak Score doubled! 🏆')),
        );
      } else {
        _gameStatus = 'Defeat 💔 Rohan won!';
      }
    });
  }

  // Travel companion schedule state
  final List<Map<String, dynamic>> _itinerary = [
    {'day': 1, 'title': 'Drive to Gokarna Beaches', 'desc': 'Check into beachfront resort. Enjoy sunset walks and acoustic jams.'},
    {'day': 2, 'title': 'Dolphin Spotting & Hike', 'desc': 'Scenic hiking from Half Moon beach to Paradise beach. Swim with locals.'},
  ];

  final _itineraryController = TextEditingController();

  void _addItineraryDay() {
    if (_itineraryController.text.trim().isEmpty) return;
    setState(() {
      _itinerary.add({
        'day': _itinerary.length + 1,
        'title': _itineraryController.text.trim(),
        'desc': 'Custom itinerary bullet. Explore together and log gorgeous moments.'
      });
      _itineraryController.clear();
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Day added to shared roadmap! 🧭')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.tab == 'games' ? 'Games Arena' : 'Travel Companion',
          style: const TextStyle(fontWeight: FontWeight.black, fontSize: 16),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: widget.tab == 'games' ? _buildGamesTab() : _buildTravelTab(),
        ),
      ),
    );
  }

  // ==================== A. GAMES ARENA ====================
  Widget _buildGamesTab() {
    return ListView(
      physics: const BouncingScrollPhysics(),
      children: [
        const SizedBox(height: 12),
        // Score banner
        Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            color: AppTheme.slate900,
            borderRadius: AppTheme.roundedCorners,
            border: Border.all(color: Colors.white.withOpacity(0.08)),
          ),
          child: const Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.emoji_events, color: Colors.amber, size: 16),
                      SizedBox(width: 6),
                      Text('GLOBAL RANK', style: TextStyle(color: Colors.amber, fontSize: 8, fontWeight: FontWeight.bold, letterSpacing: 1.5)),
                    ],
                  ),
                  SizedBox(height: 4),
                  Text('Chess Master Tier', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.bold)),
                  Text('1,480 Match Score', style: TextStyle(color: Colors.grey, fontSize: 10)),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text('82%', style: TextStyle(color: AppTheme.mint, fontSize: 20, fontWeight: FontWeight.black)),
                  Text('WIN RATE', style: TextStyle(color: Colors.grey, fontSize: 8, fontWeight: FontWeight.bold)),
                ],
              ),
            ],
          ),
        ),

        const SizedBox(height: 24),
        // Active Game widget card
        Container(
          padding: const EdgeInsets.all(16),
          decoration: AppTheme.glassDecoration(context: context),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Casual Match vs. Rohan', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11.5)),
                      Text('Casual Tic Tac Toe arena', style: TextStyle(color: Colors.grey, fontSize: 9)),
                    ],
                  ),
                  TextButton(
                    onPressed: _resetBoard,
                    child: const Text('Reset Board', style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Board Grid View
              SizedBox(
                width: 180,
                height: 180,
                child: GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 3,
                    crossAxisSpacing: 8,
                    mainAxisSpacing: 8,
                  ),
                  itemCount: 9,
                  itemBuilder: (context, idx) {
                    final cell = _board[idx];
                    return GestureDetector(
                      onTap: () => _makeMove(idx),
                      child: Container(
                        decoration: BoxDecoration(
                          color: Theme.of(context).brightness == Brightness.dark 
                              ? Colors.white.withOpacity(0.04) 
                              : Colors.black.withOpacity(0.03),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Center(
                          child: Text(
                            cell,
                            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
              const SizedBox(height: 12),

              // Game Status Text
              Text(
                _gameStatus,
                style: const TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold, fontFamily: 'JetBrains Mono'),
              ),
            ],
          ),
        ),

        const SizedBox(height: 24),
        const Text(
          'MORE MATCHING ARENAS',
          style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, letterSpacing: 1.5, color: Colors.grey),
        ),
        const SizedBox(height: 12),

        // Dummy list
        ...['Chess Battleground', 'Connect Four Duels', 'Quiz Streak Arena'].map((game) {
          return Container(
            margin: const EdgeInsets.only(bottom: 10),
            padding: const EdgeInsets.all(14),
            decoration: AppTheme.glassDecoration(context: context),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Text('🎮', style: TextStyle(fontSize: 20)),
                    const SizedBox(width: 14),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(game, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                        const Text('120 local peers waiting', style: TextStyle(color: Colors.grey, fontSize: 9)),
                      ],
                    ),
                  ],
                ),
                ElevatedButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Lobbying for $game match... 🎮')),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.primary.withOpacity(0.1),
                    foregroundColor: AppTheme.primary,
                    elevation: 0,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  ),
                  child: const Text('Play', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          );
        }),
        const SizedBox(height: 100),
      ],
    );
  }

  // ==================== B. TRAVEL COMPANION ====================
  Widget _buildTravelTab() {
    return ListView(
      physics: const BouncingScrollPhysics(),
      children: [
        const SizedBox(height: 12),
        // Active Destination Card
        Container(
          height: 180,
          decoration: BoxDecoration(
            borderRadius: AppTheme.roundedCorners,
            image: const DecorationImage(
              image: NetworkImage('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80'),
              fit: BoxFit.cover,
            ),
          ),
          child: Container(
            decoration: BoxDecoration(
              borderRadius: AppTheme.roundedCorners,
              gradient: LinearGradient(
                colors: [Colors.black.withOpacity(0.85), Colors.transparent],
                begin: Alignment.bottomCenter,
                end: Alignment.topCenter,
              ),
            ),
            padding: const EdgeInsets.all(20),
            child: const Column(
              mainAxisAlignment: MainAxisAlignment.end,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('CO-TRAVEL ROADMAP', style: TextStyle(color: AppTheme.mint, fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 2)),
                SizedBox(height: 4),
                Text('Gokarna Road Trip ✈️', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.black)),
                SizedBox(height: 6),
                Row(
                  children: [
                    Icon(Icons.currency_rupee, color: Colors.white70, size: 11),
                    Text('Budget: 12k · ', style: TextStyle(color: Colors.white70, fontSize: 10)),
                    Icon(Icons.calendar_today, color: Colors.white70, size: 10),
                    Text(' July 18-21', style: TextStyle(color: Colors.white70, fontSize: 10)),
                  ],
                ),
              ],
            ),
          ),
        ),

        const SizedBox(height: 24),
        // Shared Itinerary Title
        const Text(
          'SHARED TRIP ROADMAP',
          style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, letterSpacing: 1.5, color: Colors.grey),
        ),
        const SizedBox(height: 12),

        // Itinerary list
        ..._itinerary.map((day) {
          return Container(
            margin: const EdgeInsets.only(bottom: 12),
            padding: const EdgeInsets.all(16),
            decoration: AppTheme.glassDecoration(context: context),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Day ${day["day"]}: ${day["title"]}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: AppTheme.primary)),
                const SizedBox(height: 4),
                Text(day['desc']!, style: const TextStyle(color: Colors.grey, fontSize: 10.5, height: 1.4)),
              ],
            ),
          ).animate().fadeIn();
        }),

        // Add itinerary form
        Row(
          children: [
            Expanded(
              child: Container(
                decoration: AppTheme.glassDecoration(context: context, borderOpacity: 0.1),
                child: TextField(
                  controller: _itineraryController,
                  style: const TextStyle(fontSize: 12),
                  decoration: const InputDecoration(
                    hintText: 'Add itinerary schedule...',
                    hintStyle: TextStyle(fontSize: 11, color: Colors.grey),
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 11),
                  ),
                  onSubmitted: (val) => _addItineraryDay(),
                ),
              ),
            ),
            const SizedBox(width: 8),
            IconButton(
              onPressed: _addItineraryDay,
              style: IconButton.styleFrom(backgroundColor: AppTheme.primary.withOpacity(0.1)),
              icon: const Icon(Icons.add_circle_outline, color: AppTheme.primary),
            ),
          ],
        ),
        const SizedBox(height: 100),
      ],
    );
  }
}
