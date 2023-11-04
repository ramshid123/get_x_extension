import 'package:get/get.dart';
import 'test_index.dart';


class testBinding extends Bindings {
  @override
  void dependencies() {
    // TODO: implement dependencies
    Get.put<testController>(testController());
  }
}
