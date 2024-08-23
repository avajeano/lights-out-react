import React from "react";
import { render } from '@testing-library/react';
import Cell from './Cell';

test('it matches snapshot', () => {
    const { asFragment } = render (<Cell isLit={true}/>);
    expect(asFragment()).toMatchSnapshot()
})