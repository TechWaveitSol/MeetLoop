import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import '../theme.dart';

class CoupleTimelineScreen extends StatefulWidget {
  final String tab; // 'couple' | 'memories'
  const CoupleTimelineScreen({super.key, required this.tab});

  @override
  State<CoupleTimelineScreen> createState() => _CoupleTimelineScreenState();
}

class _CoupleTimelineScreenState extends State<CoupleTimelineScreen> {
  // Couple Checklist state
  final List<Map<String, dynamic>> _checklist = [
    {'title': 'Prepare chess challenge', 'done': true},
    {'title': 'Draft Saturday hiking itinerary', 'done': false},
    {'title': 'Order custom coffee mug designs', 'done': false},
  ];

  final List<Map<String, dynamic>> _memories = [
    {
      'date': 'June 28, 2026',
      'title': 'Aesthetic Coffee Session',
      'location': 'Sector 5 Hub',
      'img': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=250&q=80',
      'caption': 'Beating each other at Tic Tac Toe. Pooja owes me a second flat-white!',
    },
    {
      'date': 'June 14, 2026',
      'title': 'Late Night Stargazing',
      'location': 'Nandi Trails',
      'img': 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=250&q=80',
      'caption': 'Clear night sky and hot cocoa. Absolute dream moment logged.',
    },
  ];

  final _taskController = TextEditingController();
  final _memoryTitleController = TextEditingController();
  final _memoryCaptionController = TextEditingController();

  void _addTask() {
    if (_taskController.text.trim().isEmpty) return;
    setState(() {
      _checklist.add({'title': _taskController.text.trim(), 'done': false});
      _taskController.clear();
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Streak task added! 📝')),
    );
  }

  void _addMemory() {
    if (_memoryTitleController.text.trim().isEmpty) return;
    setState(() {
      _memories.insert(0, {
        'date': 'Today',
        'title': _memoryTitleController.text.trim(),
        'location': 'Nearby',
        'img': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
        'caption': _memoryCaptionController.text.trim(),
      });
      _memoryTitleController.clear();
      _memoryCaptionController.clear();
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Intimate memory locked! 📸')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.tab == 'couple' ? 'Couple Space' : 'Memory Vault',
          style: const TextStyle(fontWeight: FontWeight.black, fontSize: 16),
        ),
        actions: [
          IconButton(
            onPressed: () => context.go('/couple'),
            icon: const Icon(Icons.favorite, color: AppTheme.accent),
          ),
          IconButton(
            onPressed: () => context.go('/memories'),
            icon: const Icon(Icons.photo_library_outlined, color: AppTheme.primary),
          ),
        ],
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: widget.tab == 'couple' ? _buildCoupleTab() : _buildMemoriesTab(),
        ),
      ),
    );
  }

  // ==================== A. COUPLE SPACE TAB ====================
  Widget _buildCoupleTab() {
    return ListView(
      physics: const BouncingScrollPhysics(),
      children: [
        const SizedBox(height: 12),
        // Streak Meter Banner
        Container(
          padding: const EdgeInsets.all(22),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [AppTheme.accent, AppTheme.secondary],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: AppTheme.roundedCorners,
            boxShadow: AppTheme.glowShadow,
          ),
          child: Column(
            children: [
              const Text(
                'COUPLE STREAK LEVEL',
                style: TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 2),
              ),
              const SizedBox(height: 12),
              const Text(
                '14 Days Solid 💖',
                style: TextStyle(color: Colors.white, fontSize: 26, fontWeight: FontWeight.black, letterSpacing: -0.5),
              ),
              const SizedBox(height: 8),
              Container(
                height: 6,
                decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(3)),
                child: Row(
                  children: [
                    Expanded(
                      flex: 14, // 14 out of 30 days
                      child: Container(
                        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(3)),
                      ),
                    ),
                    const Expanded(flex: 16, child: SizedBox()),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              const Text(
                'Next milestone unlock at 30 Days. Double Streak XP active!',
                style: TextStyle(color: Colors.white87, fontSize: 10, fontStyle: FontStyle.italic),
              ),
            ],
          ),
        ).animate().scale(duration: 400.ms, curve: Curves.easeOut),

        const SizedBox(height: 24),
        // Countdown timer card
        Container(
          padding: const EdgeInsets.all(16),
          decoration: AppTheme.glassDecoration(context: context),
          child: const Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Next Date Night ☕', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                  Text('Sector 5 Coffee Rendezvous', style: TextStyle(color: Colors.grey, fontSize: 10)),
                ],
              ),
              Text(
                '23:14:02', // dynamic feel clock
                style: TextStyle(color: AppTheme.accent, fontWeight: FontWeight.black, fontSize: 16, fontFamily: 'JetBrains Mono'),
              ),
            ],
          ),
        ),

        const SizedBox(height: 24),
        // Mutual tasks checklist title
        const Text(
          'SHARED STREAK CHECKLIST',
          style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, letterSpacing: 1.5, color: Colors.grey),
        ),
        const SizedBox(height: 12),

        // Checklist loop
        ...List.generate(_checklist.length, (idx) {
          final item = _checklist[idx];
          return Container(
            margin: const EdgeInsets.only(bottom: 8),
            decoration: AppTheme.glassDecoration(context: context, borderOpacity: 0.05),
            child: ListTile(
              dense: true,
              leading: Checkbox(
                value: item['done'],
                activeColor: AppTheme.accent,
                onChanged: (val) {
                  setState(() {
                    _checklist[idx]['done'] = val;
                  });
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text(val! ? 'Milestone Completed! 🎉' : 'Milestone Unchecked')),
                  );
                },
              ),
              title: Text(
                item['title'],
                style: TextStyle(
                  fontSize: 11.5,
                  fontWeight: FontWeight.w600,
                  decoration: item['done'] ? TextDecoration.lineThrough : null,
                  color: item['done'] ? Colors.grey : null,
                ),
              ),
            ),
          );
        }),

        // Add task input
        Padding(
          padding: const EdgeInsets.only(top: 8.0),
          child: Row(
            children: [
              Expanded(
                child: Container(
                  decoration: AppTheme.glassDecoration(context: context, borderOpacity: 0.1),
                  child: TextField(
                    controller: _taskController,
                    style: const TextStyle(fontSize: 12),
                    decoration: const InputDecoration(
                      hintText: 'Add team goal...',
                      hintStyle: TextStyle(fontSize: 11, color: Colors.grey),
                      border: InputBorder.none,
                      contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                    ),
                    onSubmitted: (val) => _addTask(),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              IconButton(
                onPressed: _addTask,
                style: IconButton.styleFrom(backgroundColor: AppTheme.accent.withOpacity(0.1)),
                icon: const Icon(Icons.add, color: AppTheme.accent),
              ),
            ],
          ),
        ),
        const SizedBox(height: 100),
      ],
    );
  }

  // ==================== B. PHOTO TIMELINE VIRTUAL VAULT ====================
  Widget _buildMemoriesTab() {
    return Column(
      children: [
        // Upper Quick Creation Form
        Container(
          padding: const EdgeInsets.all(14),
          decoration: AppTheme.glassDecoration(context: context),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text('LOCK A NEW MEMORY', style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.grey)),
              const SizedBox(height: 10),
              TextField(
                controller: _memoryTitleController,
                style: const TextStyle(fontSize: 11),
                decoration: const InputDecoration(
                  hintText: 'Memory title (e.g. Hiking Summit)',
                  hintStyle: TextStyle(fontSize: 11, color: Colors.grey),
                  isDense: true,
                ),
              ),
              const SizedBox(height: 8),
              TextField(
                controller: _memoryCaptionController,
                style: const TextStyle(fontSize: 11),
                decoration: const InputDecoration(
                  hintText: 'Describe this moment...',
                  hintStyle: TextStyle(fontSize: 11, color: Colors.grey),
                  isDense: true,
                ),
              ),
              const SizedBox(height: 12),
              ElevatedButton(
                onPressed: _addMemory,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.primary,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                  padding: const EdgeInsets.symmetric(vertical: 10),
                ),
                child: const Text('Add to Timeline', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // Memories Timeline
        Expanded(
          child: ListView.builder(
            itemCount: _memories.length,
            physics: const BouncingScrollPhysics(),
            itemBuilder: (context, idx) {
              final mem = _memories[idx];
              return Container(
                margin: const EdgeInsets.only(bottom: 16),
                decoration: AppTheme.glassDecoration(context: context),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // Image Banner
                    ClipRRect(
                      borderRadius: const BorderRadius.only(topLeft: Radius.circular(24), topRight: Radius.circular(24)),
                      child: Image.network(
                        mem['img']!,
                        height: 140,
                        fit: BoxFit.cover,
                      ),
                    ),
                    // Details
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(mem['title']!, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                              Text(mem['date']!, style: const TextStyle(color: Colors.grey, fontSize: 9, fontFamily: 'JetBrains Mono')),
                            ],
                          ),
                          const SizedBox(height: 2),
                          Row(
                            children: [
                              const Icon(Icons.pin_drop_outlined, size: 10, color: AppTheme.accent),
                              const SizedBox(width: 4),
                              Text(mem['location']!, style: const TextStyle(color: Colors.grey, fontSize: 9)),
                            ],
                          ),
                          const SizedBox(height: 10),
                          Text(
                            mem['caption']!,
                            style: const TextStyle(color: Colors.grey, fontSize: 11, height: 1.4),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ).animate().fadeIn(delay: (idx * 100).ms);
            },
          ),
        ),
      ],
    );
  }
}
