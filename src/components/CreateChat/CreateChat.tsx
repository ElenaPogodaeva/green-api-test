import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateChatForm } from '../../types/types';

type CreateChatProps = {
  onPhoneChange: (value: string) => void;
  onPhoneSubmit: (value: boolean) => void;
};

export const CreateChat = ({ onPhoneChange, onPhoneSubmit }: CreateChatProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChatForm>();

  const onSubmit: SubmitHandler<CreateChatForm> = (data): void => {
    const { phoneNumber } = data;
    onPhoneChange(phoneNumber);
    onPhoneSubmit(true);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {errors?.phoneNumber && <span className="form-error">* phoneNumber invalid</span>}
      <input
        type="text"
        className="input"
        placeholder="Введите номер телефона"
        {...register('phoneNumber', { required: true, pattern: /^\d{11}$/ })}
      />
      <button type="submit" className="btn">
        Создать чат
      </button>
    </form>
  );
};

export default CreateChat;
