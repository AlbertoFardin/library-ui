import * as React from "react";
import isDOMElement from "../isDOMElement";

// Un componente React custom di esempio
const CustomComponent = () => <span>Custom</span>;

describe("isDOMElement", () => {
  it("returns true for DOM elements like 'div'", () => {
    const element = <div />;
    expect(isDOMElement(element.type)).toBe(true);
  });

  it("returns false for React components", () => {
    const element = <CustomComponent />;
    expect(isDOMElement(element.type)).toBe(false);
  });

  it("returns true for native input", () => {
    const element = <input />;
    expect(isDOMElement(element.type)).toBe(true);
  });

  it("returns false for arrow function components", () => {
    const ArrowComponent = () => <p>Arrow</p>;
    const element = <ArrowComponent />;
    expect(isDOMElement(element.type)).toBe(false);
  });

  it("returns false for class components", () => {
    class ClassComponent extends React.Component {
      render() {
        return <p>Class</p>;
      }
    }
    const element = <ClassComponent />;
    expect(isDOMElement(element.type)).toBe(false);
  });
});
