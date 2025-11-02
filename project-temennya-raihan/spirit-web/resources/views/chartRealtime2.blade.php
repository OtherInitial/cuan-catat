<div>
  <canvas id="realtimeChart2"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    var ctx2 = document.getElementById('realtimeChart2').getContext('2d');
    var myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Ampere (A)',
                data: [],
                backgroundColor: '#5BBCFF',
                borderColor: '#5BBCFF',
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

    var updateChart2 = function() {
    $.ajax({
      url: "{{ route('api.chart2') }}",
      type: 'GET',
      dataType: 'json',
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function(data) {
        myChart2.data.labels = data.labels;
        myChart2.data.datasets[0].data = data.data;
        myChart2.update();
      },
      error: function(data){
        console.log(data);
      }
    });
  }

updateChart2();
setInterval(function() {
  updateChart2();
}, 1000);

</script>