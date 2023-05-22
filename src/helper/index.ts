import html2canvas from 'html2canvas';

export const downloadSvgToJpeg = async (
  $captureBlock?: HTMLElement | null,
  fileName?: string
) => {
  if (!$captureBlock) return;
  const canvas = await html2canvas($captureBlock, {
    scale: 4,
  });
  const barcodeImageBase64 = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = barcodeImageBase64;
  link.download = fileName || '도서관-다운로드';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
