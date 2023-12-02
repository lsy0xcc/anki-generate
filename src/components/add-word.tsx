import { Button, Dialog } from "@radix-ui/themes";
import Form from "@rjsf/chakra-ui";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";

const schema: RJSFSchema = {
  properties: {
    defs: {
      items: {
        properties: {
          def: {
            items: {
              properties: {
                anti: {
                  items: {
                    type: "string",
                  },
                  type: "array",
                },
                exam: {
                  items: {
                    properties: {
                      jp: {
                        type: "string",
                      },
                      zh: {
                        type: "string",
                      },
                    },
                    type: "object",
                  },
                  type: "array",
                },
                jp: {
                  type: "string",
                },
                syns: {
                  items: {
                    type: "string",
                  },
                  type: "array",
                },
                zh: {
                  type: "string",
                },
              },
              type: "object",
            },
            type: "array",
          },
          note: {
            type: "string",
          },
          type: {
            type: "string",
          },
        },
        type: "object",
      },
      type: "array",
    },
    kana: {
      type: "string",
    },
    origin: {
      type: "string",
    },
    priority: {
      type: "number",
    },
    spell: {
      type: "string",
    },
    tune: {
      type: "string",
    },
    wordsWithSymbol: {
      items: {
        type: "string",
      },
      type: "array",
    },
  },
  type: "object",
};

const uiSchema: UiSchema = {
  "ui:order": [
    "wordsWithSymbol",
    "priority",
    "spell",
    "kana",
    "tune",
    "origin",
    "defs",
  ],
  defs: {
    items: {
      "ui:order": ["type", "def", "note"],
      def: {
        items: {
          "ui:order": ["jp", "zh", "exam", "anti", "syns"],
        },
      },
    },
  },
};

interface AddWordProps {
  onSubmit: (result: any) => void;
}

function AddWord(props: AddWordProps) {
  const [open, setOpen] = useState(false);
  const onSubmit = (data: any) => {
    props.onSubmit?.(data.formData);
    setOpen(false);
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>Edit profile</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Edit profile</Dialog.Title>
        <ChakraProvider>
          <div>
            <Form
              schema={schema}
              uiSchema={uiSchema}
              validator={validator}
              onSubmit={onSubmit}
            />
          </div>
        </ChakraProvider>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default AddWord;
