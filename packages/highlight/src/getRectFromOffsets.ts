export const getRectFromOffsets = (textDiv: HTMLElement, startOffset: number, endOffset: number): DOMRect => {
    const clonedEle = textDiv.cloneNode(true);
    textDiv.parentNode.appendChild(clonedEle);

    const firstChild = clonedEle.firstChild;
    const range = new Range();
    range?.setStart(firstChild, startOffset);
    range?.setEnd(firstChild, endOffset);

    const wrapper = document.createElement('span');
    range.surroundContents(wrapper);

    const rect = wrapper.getBoundingClientRect();

    // Remove the clone element
    clonedEle.parentNode.removeChild(clonedEle);

    return rect;
};
