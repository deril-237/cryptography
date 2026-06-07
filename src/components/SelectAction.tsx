import { useId } from "react";

export type Action = {
  value: "encrypt" | "decrypt";
  label: string;
};

const actions: Action[] = [
  { value: "encrypt", label: "Encrypt" },
  { value: "decrypt", label: "Decrypt" },
];

export type SelectActionProps = React.ComponentPropsWithoutRef<"select"> & {
  onChangeValue?: Action["value"];
};

export function SelectAction(props: SelectActionProps) {
  const id = useId();

  return (
    <div className="flex flex-col">
      <label htmlFor={id}>Action</label>
      <select
        {...props}
        className="border-2 outline-blue-500 border-gray-300 h-10 rounded p-2"
        id={id}
        defaultValue={""}
      >
        <option value="" disabled={true}>
          Choissisze une action
        </option>
        {actions.map((action) => (
          <option key={action.value} value={action.value}>
            {action.label}
          </option>
        ))}
      </select>
    </div>
  );
}
