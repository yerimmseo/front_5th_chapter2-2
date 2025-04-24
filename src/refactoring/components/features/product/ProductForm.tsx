import { ChangeEvent, useState } from "react";
import { Product } from "../../../../types";
import { useProductContext } from "../../../contexts/ProductContext";

type FormFieldProps<K extends keyof Product> = {
  id?: string;
  label: string;
  type: string;
  value: Product[K];
  onChange: (value: Product[K]) => void;
  editing?: boolean;
  fieldName?: K;
};

type ProductFormProps = {
  onSubmitComplete?: () => void;
};

export const ProductForm = ({ onSubmitComplete }: ProductFormProps) => {
  const { addProduct } = useProductContext();
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  });

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    addProduct(productWithId);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discounts: [],
    });

    if (onSubmitComplete) {
      onSubmitComplete();
    }
  };

  const FormField = <K extends keyof Product>({
    id,
    label,
    type,
    value,
    onChange,
    editing = false,
  }: FormFieldProps<K>) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue =
        type === "number"
          ? (Number(e.target.value) as Product[K])
          : (e.target.value as Product[K]);

      onChange(newValue);
    };

    const inputWrapperClass = editing ? "mb-2" : "mb-4";
    const labelClass = editing
      ? "block mb-1"
      : "block text-sm font-medium text-gray-700";

    return (
      <div className={inputWrapperClass}>
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        <input
          id={id}
          type={type}
          value={value as string | number}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      {/* val의 타입은 Product[K]인데, K가 명시되지 않았기 때문에 name에 할당하기엔 타입이 너무 넓다 */}
      <FormField<"name">
        id="productName"
        label="상품명"
        type="text"
        value={newProduct.name}
        onChange={(value) => setNewProduct({ ...newProduct, name: value })}
        fieldName="name"
      />
      <FormField<"price">
        id="productPrice"
        label="가격"
        type="number"
        value={newProduct.price}
        onChange={(value) => setNewProduct({ ...newProduct, price: value })}
      />
      <FormField<"stock">
        id="productStock"
        label="재고"
        type="number"
        value={newProduct.stock}
        onChange={(value) => setNewProduct({ ...newProduct, stock: value })}
      />
      <button
        onClick={handleAddNewProduct}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  );
};
