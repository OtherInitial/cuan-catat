<div>
    <canvas id="realtimeChart8"></canvas>
</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    
    var ctx8 = document.getElementById('realtimeChart8').getContext('2d');
    var myChart8 = new Chart(ctx8, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Ampere (A)',
                data: [],
                backgroundColor: '#10439F',
                borderColor: '#10439F',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    var tanggalAwal4 = sessionStorage.getItem('startDate4');
    var tanggalAkhir4 = sessionStorage.getItem('endDate4');
    if (tanggalAwal4 && tanggalAkhir4) {
        document.getElementById('startDate4').value = tanggalAwal4;
        document.getElementById('endDate4').value = tanggalAkhir4;
    }
    var formattedStartDate = new Date(tanggalAwal4).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    var formattedEndDate = new Date(tanggalAkhir4).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    document.getElementById('currentDate2').innerText = formattedStartDate + ' to ' + formattedEndDate;

    var updateChart8 = function() {
        var tanggalAwal4 = document.getElementById('startDate4').value;
        var tanggalAkhir4 = document.getElementById('endDate4').value;

        // Menyimpan tanggal ke dalam sessionStorage
        sessionStorage.setItem('startDate4', tanggalAwal4);
        sessionStorage.setItem('endDate4', tanggalAkhir4);

        $.ajax({
            url: "{{ route('api.chart8') }}",
            type: 'GET',
            dataType: 'json',
            data: {
                startDate4: tanggalAwal4,
                endDate4: tanggalAkhir4
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(data) {
                myChart8.data.labels = data.labels;
                myChart8.data.datasets[0].data = data.data;
                myChart8.update();
            },
            error: function(data){
                console.log(data);
            }
        });
    }

    updateChart8();
</script>
