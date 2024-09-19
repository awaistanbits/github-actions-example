import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import fetchMock from "fetch-mock";
import LoginForm from ".";

describe("Login Form",()=>{
    beforeEach(() => {
        fetchMock.reset()
      });

    test("email input field should be rendered",()=>{
        render(<LoginForm/>);

        const emailField = screen.getByTestId("email-field");

        expect(emailField).toBeInTheDocument();
    });

    test("password input field should be rendered",()=>{
        render(<LoginForm/>);

        const passwordField = screen.getByTestId("password-field");

        expect(passwordField).toBeInTheDocument();
    });

    test("submit button should be rendered",()=>{
        render(<LoginForm/>);

        const button = screen.getByRole("button");

        expect(button).toBeInTheDocument();
    });

    test("email input should be empty",()=>{
        render(<LoginForm/>);

        const emailField = screen.getByTestId("email-field");

        expect(emailField.value).toBe("");
    });

    test("password input should be empty",()=>{
        render(<LoginForm/>);

        const passwordField = screen.getByTestId("password-field");

        expect(passwordField.value).toBe("");
    });

    test("if email or password are empty then button must be disabled",()=>{
        render(<LoginForm/>);

        const button = screen.getByRole("button");

        expect(button).toBeDisabled();
    });

    test("submit button display text should be 'Login' if there is no api submission",()=>{
        render(<LoginForm/>);

        const button = screen.getByRole("button");
        expect(button).toHaveValue("Login")
    });

    test("email input should change",()=>{
        render(<LoginForm/>);

        const emailField = screen.getByTestId("email-field");
        const testValue = 'awaisali@gmail.com';

        fireEvent.change(emailField,{target:{value:testValue}});
        expect(emailField.value).toBe(testValue);
    });

    test("password input should change",()=>{
        render(<LoginForm/>);

        const passwordField = screen.getByTestId("password-field");
        const testValue = "123456";

        fireEvent.change(passwordField,{target:{value:testValue}});
        expect(passwordField.value).toBe(testValue);
    });

    test("submit button should not be disabled if email and password are not empty",()=>{
        render(<LoginForm/>);

        const emailField = screen.getByTestId("email-field");
        const passwordField = screen.getByTestId("password-field");
        const button = screen.getByRole("button");

        const testValue = "test";

        fireEvent.change(emailField,{target:{value:testValue}});
        fireEvent.change(passwordField,{target:{value:testValue}});
        expect(button).not.toBeDisabled();
    });

    test("submit button display text should be 'Loading...' if there is api submission",()=>{
        render(<LoginForm/>);

        const emailField = screen.getByTestId("email-field");
        const passwordField = screen.getByTestId("password-field");
        const button = screen.getByRole("button");

        const testValue = "test";

        fireEvent.change(emailField,{target:{value:testValue}});
        fireEvent.change(passwordField,{target:{value:testValue}});
        fireEvent.click(button)

        expect(button).toHaveValue("Loading...");
    });

    test("submit button display text should be 'Login' after api submission",async ()=>{
        render(<LoginForm/>);

        const emailField = screen.getByTestId("email-field");
        const passwordField = screen.getByTestId("password-field");
        const button = screen.getByRole("button");

        const testValue = "test";

        fireEvent.change(emailField,{target:{value:testValue}});
        fireEvent.change(passwordField,{target:{value:testValue}});
        
        fetchMock.mockResolvedValue({status:200});
        
        fireEvent.click(button);

        await waitFor(()=>expect(button).toHaveValue("Login"))

    });
})

