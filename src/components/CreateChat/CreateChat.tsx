type CreateChatProps = {
  phoneNumber: string;
  onPhoneChange: (value: string) => void;
  onPhoneSubmit: (value: boolean) => void;
};

export const CreateChat = ({ phoneNumber, onPhoneChange, onPhoneSubmit }: CreateChatProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    onPhoneChange(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (phoneNumber) {
      onPhoneSubmit(true);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="Введите номер телефона"
        value={phoneNumber}
        onChange={handleChange}
      />
      <button type="submit" className="btn">
        Создать чат
      </button>
    </form>
  );
};

export default CreateChat;
