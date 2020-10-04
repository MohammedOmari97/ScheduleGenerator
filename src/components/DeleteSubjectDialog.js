import React, { useState } from "react";
import {
  DialogTrigger,
  ActionButton,
  Text,
  Dialog,
  Heading,
  Flex,
  Divider,
  Content,
  Form,
  TextField,
  ButtonGroup,
  Button,
} from "@adobe/react-spectrum";
import { useDispatch } from "react-redux";
import { subjectRemovedFromSchedule } from "../app/store";

function DeleteSubjectDialog(props) {
  const [subjectName, setSubjectName] = useState("");
  const dispatch = useDispatch();

  return (
    <>
      <DialogTrigger>
        <ActionButton>
          <Text>Delete subject</Text>
          {/* <img src={addIcon} alt="add subject icon" /> */}
        </ActionButton>
        {(close) => (
          <Dialog>
            <Heading>
              <Flex alignItems="center" gap="size-100">
                <Text>Delete Subject from the schedule</Text>
              </Flex>
            </Heading>
            <Divider />
            <Content>
              <Form>
                <TextField
                  label="Subject's name"
                  placeholder="Digital Design"
                  autoFocus
                  onChange={setSubjectName}
                />
              </Form>
            </Content>
            <ButtonGroup>
              <Button variant="secondary" onPress={close}>
                Cancel
              </Button>
              <Button
                variant="cta"
                onPress={() => {
                  dispatch(subjectRemovedFromSchedule(subjectName));
                  close();
                }}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Dialog>
        )}
      </DialogTrigger>
    </>
  );
}

export default DeleteSubjectDialog;
