import { addNewProduct } from 'api/firebase';
import { uploadImage } from 'api/uploader';
import Button from 'components/ui/Button';
import { ChangeEvent, FormEvent, useState } from 'react';
import { cls } from 'utils/util';

export type ProductInputType = {
  title: string;
  price: string;
  category: string;
  description: string;
  options: string;
};

export default function NewProduct() {
  const [product, setProduct] = useState<ProductInputType>();
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string>();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(e.currentTarget.ariaDisabled);
    if (!file) return;
    setIsUploading(true);
    uploadImage(file!) //
      .then((url) => {
        addNewProduct({ product: product!, imageUrl: url }).then(() => {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(undefined);
          }, 4000);
        });
        setProduct(undefined);
        setFile(undefined);
        setFileUrl(undefined);
      })
      .finally(() => setIsUploading(false));
  };

  const handleChnage = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.currentTarget;
    if (name === 'file' && files) {
      setFile(files[0]);
      setFileUrl(URL.createObjectURL(files[0]));
      return;
    }

    setProduct((product) => ({ ...product!, [name]: value }));
  };
  return (
    <section className='w-full text-center'>
      <h2 className='text-2xl font-semibold my-4'>새로움 제품 등록</h2>
      {success && <p className='my-2'>✅ 제품이 추가되었습니다. </p>}
      {file && (
        <img className='w-96 mx-auto mb-2' src={fileUrl} alt={file.name} />
      )}
      <form
        id='upload-product-form'
        className='flex flex-col px-12'
        onSubmit={handleSubmit}
      >
        <label
          className={cls(
            'cursor-pointer border-dashed hover:bg-zinc-100 active:bg-zinc-200',
            file ? 'hidden' : 'block'
          )}
        >
          {`Select Image`}
          <input
            className='hidden'
            type='file'
            name='file'
            accept='image/*'
            required
            onChange={handleChnage}
          />
        </label>
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
        <Button
          disabled={isUploading}
          text={isUploading ? '업로드중...' : '제품 등록하기'}
          onClick={handleSubmit}
        />
      </form>
    </section>
  );
}
