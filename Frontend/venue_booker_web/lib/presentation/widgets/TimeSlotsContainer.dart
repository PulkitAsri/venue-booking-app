import 'package:flutter/material.dart';

class TimeSlotContainer extends StatelessWidget {
  var text;
  TimeSlotContainer(var this.text);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Card(
        elevation: 0,
        shape: RoundedRectangleBorder(
          side: BorderSide(
            color: Theme.of(context).colorScheme.outline,
          ),
          borderRadius: const BorderRadius.all(Radius.circular(12)),
        ),
        child: const SizedBox(
          width: 4,
          height: 1,
          child: Center(child: Text('Outlined Card')),
        ),
      ),
    );
  }
}

