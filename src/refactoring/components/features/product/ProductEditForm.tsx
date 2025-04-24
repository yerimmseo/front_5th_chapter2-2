import { ChangeEvent, useState } from "react";
import { useProductContext } from "../../../contexts/ProductContext";
import { Accordion } from "../../ui/common/Accordion";
import { formatCurrency } from "../../../utils";
import { Discount, Product } from "../../../../types";
import { FormFieldInput } from "../../ui/common/FormFieldInput";

export const ProductEditForm = () => {
  const { products, updateProduct } = useProductContext();

  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset } = e.target;
    const productId = dataset.id;
    const parseValue =
      name === "price" || name === "stock" ? parseInt(value) || 0 : value;

    if (!productId) {
      return;
    }

    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct({ ...editingProduct, [name]: parseValue });
    }
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };
      updateProduct(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      updateProduct(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  // 수정 완료 핸들러 함수 추가
  const handleEditComplete = () => {
    if (editingProduct) {
      updateProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  // handleEditProduct 함수 수정
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <Accordion
          key={product.id}
          data-testid={`product-${index + 1}`}
          isOpen={openProductIds.has(product.id)}
          onToggle={() => toggleProductAccordion(product.id)}
          title={
            <>
              {product.name} - {formatCurrency(product.price)}원 (재고:{" "}
              {product.stock})
            </>
          }
        >
          {editingProduct && editingProduct.id === product.id ? (
            <div>
              {/* 이전에 나눈 폼 필드와 비슷한 형식 */}
              <FormFieldInput
                label="상품명"
                type="text"
                name="name"
                value={editingProduct.name}
                editing={true}
                data-id={product.id}
                onChange={handleInputChange}
              />
              <FormFieldInput
                label="가격"
                type="number"
                name="price"
                value={editingProduct.price}
                editing={true}
                data-id={product.id}
                onChange={handleInputChange}
              />
              <FormFieldInput
                label="재고"
                type="number"
                name="stock"
                value={editingProduct.stock}
                editing={true}
                data-id={product.id}
                onChange={handleInputChange}
              />
              {/* 할인 정보 수정 부분 */}
              <div>
                <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
                {editingProduct.discounts.map((discount, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>
                      {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                      할인
                    </span>
                    <button
                      onClick={() => handleRemoveDiscount(product.id, index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      삭제
                    </button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="수량"
                    value={newDiscount.quantity}
                    onChange={(e) =>
                      setNewDiscount({
                        ...newDiscount,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    className="w-1/3 p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="할인율 (%)"
                    value={newDiscount.rate * 100}
                    onChange={(e) =>
                      setNewDiscount({
                        ...newDiscount,
                        rate: parseInt(e.target.value) / 100,
                      })
                    }
                    className="w-1/3 p-2 border rounded"
                  />
                  <button
                    onClick={() => handleAddDiscount(product.id)}
                    className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    할인 추가
                  </button>
                </div>
              </div>
              <button
                onClick={handleEditComplete}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
              >
                수정 완료
              </button>
            </div>
          ) : (
            <div>
              {product.discounts.map((discount, index) => (
                <div key={index} className="mb-2">
                  <span>
                    {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                    할인
                  </span>
                </div>
              ))}
              <button
                data-testid="modify-button"
                onClick={() => handleEditProduct(product)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
              >
                수정
              </button>
            </div>
          )}
        </Accordion>
      ))}
    </div>
  );
};
