import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:untitled/presentation/widgets/TimeSlotsCard.dart';
import 'TimeSlotsContainer.dart';

import 'Calendar.dart';

class TimeSlotsCard extends StatelessWidget {
  const TimeSlotsCard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as List<String>;
    return Center(
      child: Card(
        child: Column(
          // ignore: prefer_const_literals_to_create_immutables
          children: [
            const Text(
              "Time Slots",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
            GridView.builder(
                shrinkWrap: true,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 10),
                itemCount: availableTimeSlots.length,
                itemBuilder: (BuildContext context, index) {
                  return TimeSlotContainer(args[index]);
                }),
          ],
        ),
      ),
    );
  }
}
