import React from "react";
import "./App.css";
import { Container, Col, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import view from "./Views/view.js";
require("dotenv").config();
function App() {
  return (
    <div className="App">
        <Router>
          <Container fluid={true}>
            <Row>
              <Col>
                <Switch>
                  <Route exact path="/" component={view} />
                  <Route render={() => (<h2 style={{ height: "100vh" }}>Not Found</h2>)} />
                </Switch>
              </Col>
            </Row>
          </Container>
        </Router>
      </div>
  );
}
export default App;