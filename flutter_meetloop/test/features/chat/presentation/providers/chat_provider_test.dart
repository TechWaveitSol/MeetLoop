import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/mockito.dart';
import 'package:flutter_meetloop/features/chat/domain/entities/message_entity.dart';
import 'package:flutter_meetloop/features/chat/domain/repositories/chat_repository.dart';
import 'package:flutter_meetloop/features/chat/presentation/providers/chat_provider.dart';

class MockChatRepository extends Mock implements ChatRepository {
  @override
  Future<void> sendMessage(MessageEntity message) {
    return super.noSuchMethod(
      Invocation.method(#sendMessage, [message]),
      returnValue: Future.value(),
      returnValueForMissingStub: Future.value(),
    ) as Future<void>;
  }

  @override
  Future<void> addReaction(String chatId, String messageId, String userId, String emoji) {
    return super.noSuchMethod(
      Invocation.method(#addReaction, [chatId, messageId, userId, emoji]),
      returnValue: Future.value(),
      returnValueForMissingStub: Future.value(),
    ) as Future<void>;
  }
}

void main() {
  late MockChatRepository mockChatRepository;
  late ChatController chatController;

  setUp(() {
    mockChatRepository = MockChatRepository();
    chatController = ChatController(mockChatRepository);
  });

  group('ChatController tests', () {
    test('sendMessage triggers repository call with mapped entity', () async {
      await chatController.sendMessage(
        chatId: 'chat_123',
        senderId: 'user_a',
        receiverId: 'user_b',
        text: 'Hello!',
      );

      verify(mockChatRepository.sendMessage(any)).called(1);
    });
  });
}
