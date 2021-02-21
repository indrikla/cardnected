from django.db import models

# Create your models here.
class ChangeLog(models.Model):
    created = models.DateTimeField(auto_now_add=True, null=True)
    version = models.CharField('Version', max_length=50, null=True, blank=False)
    title = models.CharField('Title', max_length=400, null=True, blank=False)
    date = models.CharField('Date', max_length=300, null=True, blank=False)
    desc = models.CharField('Description', max_length=500, null=True, blank=False)

    class Meta:
        db_table = 'ChangeLog'
        ordering = ['-created']


    def __str__(self):
        return self.version
