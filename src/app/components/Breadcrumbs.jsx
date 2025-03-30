import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ items }) => {
  return (
    <Breadcrumb className="custom-breadcrumb">
      {items.map((item, index) => (
        <Breadcrumb.Item
          key={index}
          active={index === items.length - 1}
          linkAs={Link}
          linkProps={{ to: item.path }}
        >
          {item.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
