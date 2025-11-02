<div>
    <canvas id="realtimeChart7"></canvas>
</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    
    var ctx7 = document.getElementById('realtimeChart7').getContext('2d');
    var myChart7 = new Chart(ctx7, {
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
    var tanggalAwal = sessionStorage.getItem('startDate');
    var tanggalAkhir = sessionStorage.getItem('endDate');
    if (tanggalAwal && tanggalAkhir) {
        document.getElementById('startDate').value = tanggalAwal;
        document.getElementById('endDate').value = tanggalAkhir;
    }
    var formattedStartDate = new Date(tanggalAwal).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    var formattedEndDate = new Date(tanggalAkhir).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    document.getElementById('currentDate').innerText = formattedStartDate + ' to ' + formattedEndDate;

    var updateChart7 = function() {
        var tanggalAwal = document.getElementById('startDate').value;
        var tanggalAkhir = document.getElementById('endDate').value;

        // Menyimpan tanggal ke dalam sessionStorage
        sessionStorage.setItem('startDate', tanggalAwal);
        sessionStorage.setItem('endDate', tanggalAkhir);

        $.ajax({
            url: "{{ route('api.chart7') }}",
            type: 'GET',
            dataType: 'json',
            data: {
                startDate: tanggalAwal,
                endDate: tanggalAkhir
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(data) {
                myChart7.data.labels = data.labels;
                myChart7.data.datasets[0].data = data.data;
                myChart7.update();
            },
            error: function(data){
                console.log(data);
            }
        });
    }

    updateChart7();
</script>
