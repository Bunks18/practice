const useLocalStorage = (
  key,
  defaultValue = "",
  { serialize = JSON.stringfy, deserialize = JSON.parse }
) => {
  const [name, setName] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      return serialize(valueInLocalStorage);
    }

    return typeof defaultValue === "" ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.remove(key);
    }
    window.localStorage.setItem(key, name);
  }, [name]);

  return [name, setName];
};

function Greeting(
  key,
  defaultValue = "",
  { serialize = JSON.stringfy, deserialize = JSON.parse }
) {
  const [name, setName] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      return serialize(valueInLocalStorage);
    }

    return typeof defaultValue === "" ? defaultValue() : defaultValue;
  });

  //vs, moving the above intialization to a func call moves the computation
  // out of the render cycle and into the lazy initialization
  //   const [name, setName] = React.useState(
  //     () => window.localStorage.getItem('name') ?? initialName,
  //   )

  React.useEffect(() => {
    window.localStorage.setItem("name", name);
  }, [name]);

  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}
