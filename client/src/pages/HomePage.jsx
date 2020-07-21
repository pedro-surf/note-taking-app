import React, { useEffect } from "react";
import styled from "styled-components";

import { Container, Badge, Fade, PopoverHeader, Popover } from "reactstrap";
import Todo from "../components/Todo";
import NewTodoForm from "../components/NewTodoForm";
import PaginationComponent from "../components/PaginationComponent";
import "../App.css";
import { useStateValue } from "../state";

const TodosSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  justify-content: center;
  align-items: center;
`;

function HomePage() {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const [
    {
      todoData: { todos, count },
    },
    dispatch,
  ] = useStateValue();

  let limitPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from server...");
      const data = await fetch("/todos").then((res) => res.json());
      if (data && data.todos && data.todos.length) {
        const todos = data.todos.slice(0, 5); // Take only 5 todos from response data
        todos.forEach((el) =>
          sessionStorage.setItem(el.id, `${el.title}/${el.completed}`)
        );
        dispatch({
          type: "setTodos",
          todos,
        });
      }
    };
    if (!count) {
      fetchData();
    }
  }, [count, dispatch]);

  const handleNextPage = () =>
    currentPage + 1 >= Math.ceil(count / limitPerPage)
      ? alert("This is the last page.")
      : setCurrentPage(currentPage + 1);

  const handlePrevPage = () =>
    currentPage === 0
      ? alert("This is the first page.")
      : setCurrentPage(currentPage - 1);

  let offset = currentPage * limitPerPage;
  return (
    <Container className="App">
      <Fade timeout={150}>
        <h1 className="mt-1">
          <Badge color="primary">Note Taking App</Badge>
        </h1>
        <Badge className="mr-3" color="secondary">
          Write down anything you have in mind
        </Badge>
        <Badge
          onMouseEnter={() => setPopoverOpen(true)}
          onMouseOut={() => setPopoverOpen(false)}
          id="Popover1"
          color="info"
        >
          {count}
        </Badge>
        {popoverOpen && (
          <Popover
            placement="bottom"
            isOpen={popoverOpen}
            target="Popover1"
            toggle={() => setPopoverOpen(!popoverOpen)}
          >
            <PopoverHeader>
              {count} ideas. Click on any to see it in details.
            </PopoverHeader>
          </Popover>
        )}
      </Fade>
      <Fade timeout={1000}>
        {" "}
        <NewTodoForm />
      </Fade>

      {count > limitPerPage && (
        <PaginationComponent
          next={() => handleNextPage()}
          prev={() => handlePrevPage()}
          currentPage={+currentPage}
        />
      )}
      <Fade timeout={1800}>
        <TodosSection>
          {todos ? (
            todos.map(
              ({ id, title, completed, body }, index) =>
                index >= offset && // Pagination
                index < offset + limitPerPage && (
                  <Todo
                    key={index}
                    id={id}
                    title={title}
                    body={body}
                    completed={completed}
                    index={index}
                  />
                )
            )
          ) : (
            <p>Loading..</p>
          )}
        </TodosSection>
      </Fade>
    </Container>
  );
}

export default HomePage;
