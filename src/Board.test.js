import React from "react";
import { render } from '@testing-library/react';
import Board from "./Board";

test('it matches snapshot', () => {
    const { asFragment } = render(<Board />)
    expect(asFragment()).toMatchSnapshot()
})