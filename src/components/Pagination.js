import axios from "axios";
import React, { useEffect, useState } from "react";

const Pagination = ({ data, renderComponent, title, pageLimit, dataLimit }) => {
  const [pages] = useState(Math.round(data.length / dataLimit));
};
