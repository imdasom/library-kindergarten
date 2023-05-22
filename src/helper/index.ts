import html2canvas from 'html2canvas';

export const downloadSvgToJpeg = async ($captureBlock, fileName) => {
  if (!$captureBlock) return;
  const canvas = await html2canvas($captureBlock, {
    scale: 4,
  });
  const barcodeImageBase64 = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = barcodeImageBase64;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
