import { useEffect, useState } from "react";
import { paths } from "./icons/paths";

const Icon = ({ variant, size }) => {
  const [innerHTML, setInnerHTML] = useState(null);

  const setHTML = async () => {
    let html = null;

    if (variant !== undefined) {
      html = await paths[variant].then((x) => x.default);

      console.log(html);

      setInnerHTML(html);
    }
  };

  useEffect(() => {
    setHTML();
  }, []);

  return (
    <i data-size={size}>
      <img src={innerHTML?.src} />
    </i>
  );
};

export { Icon };
