function openTab(event, tabName) {
  const tabcontents = document.getElementsByClassName('tabcontent');
  tabcontents.forEach((tabcontent) => {
    tabcontent.style.display = 'none';
  });

  const tablinks = document.getElementsByClassName('tablink');
  tablinks.forEach((tablink) => {
    tablink.className = tablink.className.replace(' active', '');
  });

  document.getElementById(tabName).style.display = 'block';
  event.currentTarget.className += ' active';
}
document.getElementById('defaultOpen').click();

function openNav() {
  document.getElementById('mySidenav').style.width = '250px';
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
}
