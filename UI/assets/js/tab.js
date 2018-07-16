function openTab(event, tabName) {
    let i,
        tabcontents,
        tablinks;

        tabcontents = document.getElementsByClassName('tabcontent')

        for(let tabcontent of tabcontents) {
            tabcontent.style.display = "none";
        }

        tablinks = document.getElementsByClassName('tablink');
        for(let tablink of tablinks) {
            tablink.className = tablink.className.replace(' active', '');
        }

        document.getElementById(tabName).style.display = "block";
        event.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}