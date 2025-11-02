<div>
    <canvas id="realtimeChart9"></canvas>
</div>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    
    var ctx9 = document.getElementById('realtimeChart9').getContext('2d');
    var myChart9 = new Chart(ctx9, {
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
    var tanggalAwal2 = sessionStorage.getItem('startDate2');
    var tanggalAkhir2 = sessionStorage.getItem('endDate2');
    if (tanggalAwal2 && tanggalAkhir2) {
        document.getElementById('startDate2').value = tanggalAwal2;
        document.getElementById('endDate2').value = tanggalAkhir2;
    }
    var formattedStartDate = new Date(tanggalAwal2).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    var formattedEndDate = new Date(tanggalAkhir2).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    document.getElementById('currentDate3').innerText = formattedStartDate + ' to ' + formattedEndDate;

    var updateChart9 = function() {
        var tanggalAwal2 = document.getElementById('startDate2').value;
        var tanggalAkhir2 = document.getElementById('endDate2').value;

        // Menyimpan tanggal ke dalam sessionStorage
        sessionStorage.setItem('startDate2', tanggalAwal2);
        sessionStorage.setItem('endDate2', tanggalAkhir2);

        $.ajax({
            url: "{{ route('api.chart9') }}",
            type: 'GET',
            dataType: 'json',
            data: {
                startDate2: tanggalAwal2,
                endDate2: tanggalAkhir2
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function(data) {
                myChart9.data.labels = data.labels;
                myChart9.data.datasets[0].data = data.data;
                myChart9.update();
            },
            error: function(data){
                console.log(data);
            }
        });
    }

    updateChart9();
</script>
