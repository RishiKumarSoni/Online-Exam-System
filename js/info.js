let tbodyRef = document.getElementById('tbody');
let tfootRef = document.getElementById('tfoot');

finalUpdate();

function finalUpdate() {
  let finalArr = JSON.parse(localStorage.getItem('finalArr'));
  tbodyRef.innerHTML = ``;
  tfootRef.innerHTML = ``;

  tbodyRef.innerHTML = `
        <tr>
            <td>${finalArr.attempted}</td>
            <td>${finalArr.unattempted}</td>
            <td>${finalArr.correct}</td>
            <td>${finalArr.incorrect}</td>
        </tr>
    `;

  tfootRef.innerHTML = `
        <tr>
            <td colspan="3">Total Marks</td>
            <td>${finalArr.marks}</td>
        </tr>
    `;
}
