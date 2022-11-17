export default function downloadCalendarFile(file: string, fileName: string) {
    const element = document.createElement('a');
    const blobFile = new Blob([file], {
        type: 'text/calendar',
    });
    element.className = "download";
    element.download = "file-" + new Date().getTime();
    element.href = URL.createObjectURL(blobFile);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();    
    element.parentElement?.removeChild(element);

}