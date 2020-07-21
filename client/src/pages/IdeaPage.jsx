import React, { useState, useEffect } from "react";
import { useStateValue } from "../state";
import Todo from "../components/Todo";
import { Row, Col, Button } from "reactstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ContentWrapper = styled.div`
  justify-content: center;
  align-items: center;
  padding: auto;
  display: flex;
`;

const IdeaPage = ({ match }) => {
  const [
    {
      todoData: { todos },
    },
  ] = useStateValue();

  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    if (todos && todos.length) {
      setCurrentTodo(todos.find(({ id }) => id.toString() === match.params.id));
    }
    if (!todos || !todos.length) {
      console.log("Searching session storage..");
      const data = sessionStorage.getItem(match.params.id);
      const titleAndCompleted = data.split("/");
      const todo = {
        title: titleAndCompleted[0],
        completed: titleAndCompleted[1] === "true",
        id: match.params.id,
      };
      setCurrentTodo(todo);
    }
  }, [todos, match.params.id]);
  return (
    <div>
      <h1>Note #{match.params.id}</h1>
      <ContentWrapper>
        <Row>
          <Col xs={12}>
            {currentTodo ? (
              <Todo {...currentTodo} isTodoPage />
            ) : (
              <p>Note not found! :/</p>
            )}
          </Col>
        </Row>
      </ContentWrapper>
      <Button className="btn btn-warning mt-4">
        <Link to="/">Back to Main Page</Link>
      </Button>
    </div>
  );
};

export default IdeaPage;
