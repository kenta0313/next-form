import type { NextPage } from 'next'
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type Inputs = {
  name: string;
  phone_number: number;
}

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    criteriaMode: "all"
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>名前</label>
      <input {...register("name")} />
      <label>電話番号</label>
      <input
        {...register("phone_number", { 
          required: "必須項目です", 
          pattern: {
            value: /\d+/,
            message: "数字で入力して"
          }
        })}
      />
      <ErrorMessage
        errors={errors}
        name="phone_number"
        render={({ messages }) => {
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            : null;
        }}
      />
      <input type="submit" />
    </form>
  )
}

export default Home
