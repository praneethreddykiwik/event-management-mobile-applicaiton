import styled from "styled-components/native";
import { Button } from "../../../../components/Buttons/Button";

const CreateEventButtons = ({ onCreateEvent, onManageManagers }) => (
  <Row>
    <CreateButton>
      <Button type="icon" icon="add" onClick={onCreateEvent} whiteText>
        Create Event
      </Button>
    </CreateButton>

    <ManageButton>
      <Button type="icon" icon="group" onClick={onManageManagers}>
        Manage Event Managers
      </Button>
    </ManageButton>
  </Row>
);

const Row = styled.View`
  flex-direction: column;
  gap: 10px;
  padding: 16px 0;
`;

const CreateButton = styled.View`
  flex: 1;
`;

const ManageButton = styled.View`
  flex: 1;
`;

export default CreateEventButtons;
