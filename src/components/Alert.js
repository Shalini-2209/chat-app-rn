import React from "react";
import {
  Dialog,
  Portal,
  Paragraph,
  Provider,
  Button,
} from "react-native-paper";

const Alert = ({ alert, setAlert }) => {
  const hideDialog = () => setAlert("");

  return (
    <Provider>
      <Portal>
        <Dialog visible={alert} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>{alert}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default Alert;
