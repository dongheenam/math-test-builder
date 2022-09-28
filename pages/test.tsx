const createQuestion = async () => {
  try {
    const res = await fetch("/api/create-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: "algebra",
        yearLevel: "8",
        text: "3 plus 5 equals?",
        solution: "8",
      }),
    });
    if (!res.ok) {
      throw new Error("Response was not OK");
    }
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

/* Main JSX */
const Test = () => {
  return (
    <>
      <span>Click this button: </span>
      <button>Add a question</button>
    </>
  );
};

export default Test;
