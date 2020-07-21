import React from "react";
import styled from "styled-components";
import { Input, FormGroup, Label, Badge, Spinner } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../state";

const CardWrapper = styled.div`
  justify-content: center;
  flex: 1 0 42%;
  margin: 5px;
  ${({ isTodoPage }) =>
    !isTodoPage &&
    `
    min-height: 25vh;
    min-width: 12vw;
  `}
  border-radius: 1%;
  padding: 10px 5px;
  background-color: gray;
  &:hover {
    background-color: #daa520;
  }
`;

const CompleteInput = styled(Input)`
  cursor: pointer;
  &:hover {
    border-color: blue;
  }
`;

const CompleteLabel = styled(Label)`
  cursor: pointer;
  &:hover {
    text-decoration: 1px underline blue;
  }
`;

const TodoTitle = styled.h3`
  cursor: pointer;
  ${({ completed }) => completed && `text-decoration: line-through;`}
  &:hover {
    text-decoration: 2px underline blue;
  }
`;

const TodoBody = styled.p`
  cursor: pointer;
`;

const Todo = ({ isTodoPage = false, title, body, id, completed, index }) => {
  const [loading, setLoading] = React.useState(false);
  const [, dispatch] = useStateValue();
  let history = useHistory();

  const toggleCompleted = async (id, title, completed) => {
    setLoading(true);
    const response = await fetch("/todos", {
      method: "PUT",
      body: JSON.stringify({ id, title, completed, userId: 1 }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((r) => r.json());
    dispatch({
      type: "patchTodo",
      todo: response.todo,
    });
    sessionStorage.setItem(id, title + "/" + !completed);
    setLoading(false);
  };

  const displayTodoTitle = (extended) => {
    if (!title) {
      return "Untiled note";
    }
    if (extended) {
      return title;
    }
    let renderIndex = "";
    if (index && !isTodoPage) {
      renderIndex += index + 1 + ". ";
    }
    let titleRest = "";
    if (title.length > 16 && !isTodoPage) {
      titleRest += title.slice(1, 16) + "...";
    } else {
      titleRest = title.slice(1);
    }
    return renderIndex + title.slice(0, 1).toUpperCase() + titleRest;
  };

  const displayTodoBody = () => {
    if (!body) {
      return displayTodoTitle(true);
    }
    if (isTodoPage) {
      return body;
    }
    if (body.length > 14) {
      return body.slice(0, 1) + body.slice(1, 14) + "...";
    }
    return body;
  };

  return (
    <CardWrapper isTodoPage={isTodoPage}>
      <TodoTitle
        onClick={() => history.push(`/ideas/${id}`)}
        completed={completed}
      >
        {displayTodoTitle()}
      </TodoTitle>
      <TodoBody onClick={() => history.push(`/ideas/${id}`)}>
        {displayTodoBody()}
      </TodoBody>
      <div>
        <FormGroup>
          <CompleteInput
            id="completedCheckbox"
            name="completedCheckbox"
            type="checkbox"
            checked={completed}
            disabled={loading}
            onChange={() => toggleCompleted(id, title, completed)}
          />
          <CompleteLabel
            onClick={() => toggleCompleted(id, title, completed)}
            htmlFor="completedCheckbox"
          >
            Complete
          </CompleteLabel>
        </FormGroup>
      </div>
      <div>
        <Link to={`/ideas/${id}`}>
          <Badge color="success">ID #{id}</Badge>
        </Link>
      </div>
      <div>
        {loading && (
          <div>
            <Spinner animation="grow" />
            <p>Loading...</p>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default Todo;
