$(document).ready(function(){
$('<link rel="stylesheet" href="yved/style.css"/*tpa=http://trend-today.ru/G-Shock/js/yved/style.css*/>').appendTo('head');
var i = 0;
function yved(){
i=1;
$('.yved:nth-child('+i+')').fadeIn(500).delay(7000).fadeOut(500);//� ���� ������� � �� 500 - ����� �������� ���������, 5000 - ����� ��������, 500 - ����� ��������� ����������� �������������
}
setTimeout(function(){
setInterval(
function(){
i=i+1;
if(i>20) i=1;//10 - ���������� �����������
$('.yved:nth-child('+i+')').fadeIn(500).delay(7000).fadeOut(500);//� ���� ������� � �� 500 - ����� �������� ���������, 5000 - ����� ��������, 500 - ����� ��������� ����������� �������������
},40000);//25000 - �������� � �� ���� �������� �����������
yved();
},10000);//10000 - �������� � �� ����� ������� ������� �����������
});