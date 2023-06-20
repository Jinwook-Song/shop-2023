import { uploadImage } from 'api/uploader';
import Button from 'components/ui/Button';
import { ChangeEvent, FormEvent, useState } from 'react';

type ProductInputType = {
  title: string;
  price: string;
  category: string;
  description: string;
  options: string;
  [key: string]: any;
};

export default function NewProduct() {
  const [product, setProduct] = useState<ProductInputType>();
  const [file, setFile] = useState<File>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    uploadImage(file!).then((url) => console.log(url));
  };

  const handleChnage = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.currentTarget;
    if (name === 'file' && files) {
      setFile(files[0]);
      return;
    }

    setProduct((product) => ({ ...product!, [name]: value }));
  };
  return (
    <section>
      {file && <img src={URL.createObjectURL(file)} alt={file.name} />}
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          name='file'
          accept='image/*'
          required
          onChange={handleChnage}
        />
        <input
          type='text'
          name='title'
          value={product?.title ?? ''}
          placeholder='제품명'
          required
          onChange={handleChnage}
        />
        <input
          type='number'
          name='price'
          value={product?.price ?? ''}
          placeholder='가격'
          required
          onChange={handleChnage}
        />
        <input
          type='text'
          name='category'
          value={product?.category ?? ''}
          placeholder='카테고리'
          required
          onChange={handleChnage}
        />
        <input
          type='text'
          name='description'
          value={product?.description ?? ''}
          placeholder='제품 설명'
          required
          onChange={handleChnage}
        />
        <input
          type='text'
          name='options'
          value={product?.options ?? ''}
          placeholder='옵션(콤마로 구분)'
          required
          onChange={handleChnage}
        />
        <Button text={'제품 등록하기'} onClick={() => {}} />
      </form>
    </section>
  );
}
