import React from "react";
import {
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Button,
  Popover,
  PopoverHeader,
  Spinner,
} from "reactstrap";
import { useStateValue } from "../state";
import styled from "styled-components";

const StyledButton = styled(Button)`
  &:hover {
    background-color: #daa520;
    color: black;
  }
`;

const NewTodoForm = () => {
  const initialFormState = {
    title: "My Notes",
    body: "Go code, learn better ways, review, etc",
    userId: 1,
  };
  const [formSearch, setFormSearch] = React.useState(initialFormState);
  const [loading, setLoading] = React.useState(false);
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const [, dispatch] = useStateValue();

  const createTodo = async () => {
    const { title, body } = formSearch;
    if (!title) {
      return setPopoverOpen(true);
    }
    setLoading(true);
    const response = await fetch("/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ title, body, userId: 1 }),
    }).then((r) => r.json());
    if (response.todo) {
      dispatch({
        type: "addTodo",
        todo: response.todo,
      });
      sessionStorage.setItem(response.todo.id, title + "/false");
    }
    setLoading(false);
  };

  return (
    <div>
      <Row className="mt-2">
        <Col>
          <Label htmlFor="title">Title</Label>
          <Input
            value={formSearch.title}
            onChange={(e) =>
              setFormSearch({ ...formSearch, title: e.target.value })
            }
            name="title"
            id="title"
          ></Input>
        </Col>
      </Row>
      <FormGroup>
        <Label htmlFor="notes">Notes</Label>
        <Input
          type="textarea"
          value={formSearch.body}
          onChange={(e) =>
            setFormSearch({ ...formSearch, body: e.target.value })
          }
          name="notes"
          id="notes"
          placeholder="Today I went hiking and it was very beautiful despite cold weather.."
        />
      </FormGroup>
      <StyledButton
        onClick={createTodo}
        disabled={loading}
        id="Popover1"
        type="button"
      >
        Add note
      </StyledButton>
      {loading && (
        <div>
          <Spinner />
        </div>
      )}
      {popoverOpen && (
        <Popover
          placement="bottom"
          isOpen={popoverOpen}
          target="Popover1"
          toggle={() => setPopoverOpen(!popoverOpen)}
        >
          <PopoverHeader>Preencha todos os campos!</PopoverHeader>
        </Popover>
      )}
    </div>
  );
};

export default NewTodoForm;
