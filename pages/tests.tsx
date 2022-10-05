import { useForm } from "@mantine/form";
import { TextInput, Button, Group } from "@mantine/core";
import { randomId } from "@mantine/hooks";

export default function Test() {
  return (
    <div style={{ maxWidth: 320, margin: "auto" }}>
      <Group position="center" mt="xl">
        <Button onClick={() => console.log("hello, cockroach!")}>
          Send data!
        </Button>
      </Group>
    </div>
  );
}
