import React, { useState } from "react";
import {
  ActionButton,
  Item,
  DialogTrigger,
  Dialog,
  Heading,
  Divider,
  Flex,
  ListBox,
  Provider,
  defaultTheme,
  Section,
  Content,
  Text,
} from "@adobe/react-spectrum";
import { useSelector } from "react-redux";

function InstructorsLoad() {
  const subjects = useSelector((state) => state.schedule);
  console.log(subjects);
  const instructorsArr = useSelector((state) => {
    return state.schedule.map((subject) => {
      return subject.teacher;
    });
  });
  const instructors = [...new Set(instructorsArr)];
  console.log(instructors);
  const [selectedInstructor, setSelectedInstructor] = useState(new Set());
  const selectedInstructorSubjects = subjects.filter(
    (subject) => subject.teacher === [...selectedInstructor][0]
  );

  console.log(selectedInstructor);

  return (
    <>
      <Provider theme={defaultTheme}>
        <DialogTrigger isDismissable>
          <ActionButton>View Intructors load</ActionButton>
          <Dialog minHeight="size-6000">
            <Heading>Intrcutors Load</Heading>
            <Divider />
            <Content>
              <Flex direction="row" gap="size-200">
                <ListBox
                  width="size-2400"
                  aria-label="Teachers"
                  // items={instructors}
                  selectedKeys={selectedInstructor}
                  selectionMode="single"
                  onSelectionChange={setSelectedInstructor}
                >
                  <Section title="Instructors">
                    {instructors.map((instructor) => (
                      <Item key={instructor}>
                        <Text>{instructor}</Text>
                        <Text slot="description">
                          {subjects.reduce((acc, subject) => {
                            if (subject.teacher === instructor) {
                              return acc + subject.hpw;
                            }
                            return acc;
                          }, 0)}{" "}
                          hours
                        </Text>
                      </Item>
                    ))}
                  </Section>
                </ListBox>
                {/* <ListBox
                  width="size-2400"
                  aria-label="Teachers"
                  // items={instructors}
                  selectedKeys={selectedInstructor}
                  selectionMode="single"
                  onSelectionChange={setSelectedInstructor}
                >
                  <Section title="Instructors">
                    {instructors.map((instructor) => (
                      <Item key={instructor}>
                        <Text>{instructor}</Text>
                      </Item>
                    ))}
                  </Section>
                </ListBox> */}
                <ListBox width="size-2400" aria-label="Teachers load">
                  <Section title="Subjects">
                    {selectedInstructor &&
                      selectedInstructorSubjects.map((subject) => (
                        <Item>{subject.name}</Item>
                      ))}
                  </Section>
                </ListBox>
              </Flex>
            </Content>
          </Dialog>
        </DialogTrigger>
      </Provider>
    </>
  );
}

export default InstructorsLoad;

/**


subjects
                        .filter(
                          (subject) =>
                            subject.teacher === [...selectedInstructor][0]
                        )
                        .map((subject) => <Item>{subject.name}</Item>)


 */
