function sortTable(tableId, columnIndex) {
    const table = document.getElementById(tableId);
    let rows = Array.from(table.tBodies[0].rows);
    let isAscending = table.getAttribute("data-sort-order") === "asc";

    // Store original rank numbers
    const originalRanks = rows.map(row => row.cells[0].innerText);

    // Remove existing animation classes
    rows.forEach(row => row.classList.remove('row-transition'));

    // Sort the rows
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].innerText;
        const cellB = rowB.cells[columnIndex].innerText;
        const numA = parseFloat(cellA);
        const numB = parseFloat(cellB);
        if (!isNaN(numA) && !isNaN(numB)) {
            return isAscending ? numA - numB : numB - numA;
        }
        return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    });

    // Apply animation and reorder rows
    rows.forEach((row, index) => {
        row.classList.add('row-transition');
        row.cells[0].innerText = originalRanks[index];
        table.tBodies[0].appendChild(row);
    });

    table.setAttribute("data-sort-order", isAscending ? "desc" : "asc");

    // Update sort indicators
    const headers = table.getElementsByTagName("th");
    for (let header of headers) {
        header.classList.remove("sorted-asc", "sorted-desc");
    }
    const clickedHeader = table.rows[1].cells[columnIndex-2];
    clickedHeader.classList.add(isAscending ? "sorted-desc" : "sorted-asc");
}

function adjustFontSize(action) {
    const table = document.getElementById('sortableTable');
    const currentSize = parseFloat(window.getComputedStyle(table).fontSize);
    
    let newSize;
    if (action === 'increase') {
        newSize = currentSize * 1.1; // 增加10%
        if (newSize > 24) newSize = 24; // 最大字号限制
    } else {
        newSize = currentSize * 0.9; // 减少10%
        if (newSize < 10) newSize = 10; // 最小字号限制
    }
    
    // 应用到整个表格及其所有子元素
    table.style.fontSize = `${newSize}px`;
    
    // 调整表格内所有单元格的padding以保持布局比例
    const cells = table.getElementsByTagName('td');
    const headers = table.getElementsByTagName('th');
    const padding = Math.max(6, Math.floor(newSize * 0.5));
    
    [...cells, ...headers].forEach(cell => {
        cell.style.padding = `${padding}px`;
    });

    // 确保表格内的所有文本元素都继承新的字体大小
    const allElements = table.getElementsByTagName('*');
    [...allElements].forEach(element => {
        if (element.tagName !== 'IMG' && element.tagName !== 'BUTTON') {
            element.style.fontSize = `${newSize}px`;
        }
    });
}

// 监听元素进入视口
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    elements.forEach(element => observer.observe(element));
});