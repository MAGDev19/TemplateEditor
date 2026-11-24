import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";

import Button from "./Button";

describe("Button", () => {

    it("debe renderizar el texto", () => {

        render(
            <Button>
                Guardar
            </Button>
        );

        expect(
            screen.getByRole("button")
        ).toHaveTextContent("Guardar");

    });

    it("debe estar deshabilitado", () => {

        render(
            <Button disabled>
                Guardar
            </Button>
        );

        expect(
            screen.getByRole("button")
        ).toBeDisabled();

    });

});