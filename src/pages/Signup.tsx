import React from "react";
import Button from "../core/Button";
import { PageType, PageKey } from ".";

const Signup: React.FunctionComponent<PageType> = (props) => {
  return (
    <div>
      <p>Signup page</p>
      <p>...</p>

      <p>Already have an account?</p>
      <p>
        <br></br>
      </p>
      <Button onClick={() => props.to(PageKey.Login)}>Login</Button>
    </div>
  );
};

export default Signup;
